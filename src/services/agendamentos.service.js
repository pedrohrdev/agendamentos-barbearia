import { supabase } from "../database/index.js";

export async function criarAgendamentoService({
  cliente_id,
  barbeiro_id,
  servico_id,
  data_inicio,
}) {
  // buscar serviço
  const { data: servico, error: servicoError } = await supabase
    .from("servicos")
    .select("*")
    .eq("id", servico_id)
    .single();

  if (servicoError || !servico) {
    const err = new Error("Serviço não encontrado");
    err.status = 404;
    throw err;
  }

  // calcular data_fim
  const inicio = new Date(data_inicio);

  const fim = new Date(inicio.getTime() + servico.duracao_minutos * 60000);

  // verificar conflito
  const { data: conflitos, error: conflitoError } = await supabase
    .from("agendamentos")
    .select("*")
    .eq("barbeiro_id", barbeiro_id)
    .lt("data_inicio", fim.toISOString())
    .gt("data_fim", inicio.toISOString());

  if (conflitoError) {
    throw new Error(conflitoError.message);
  }

  if (conflitos.length > 0) {
    const err = new Error("Horário já ocupado");
    err.status = 409;
    throw err;
  }

  // criar agendamento
  const { data, error } = await supabase
    .from("agendamentos")
    .insert([
      {
        cliente_id,
        barbeiro_id,
        servico_id,
        data_inicio: inicio.toISOString(),
        data_fim: fim.toISOString(),
        status: "agendado",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function listarAgendamentosUsuarioService(cliente_id) {
  const { data, error } = await supabase
    .from("agendamentos")
    .select(
      `
      *,
      servicos(nome, preco, duracao_minutos)
    `,
    )
    .eq("cliente_id", cliente_id)
    .order("data_inicio", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function cancelarAgendamentoService(id) {
  const { data, error } = await supabase
    .from("agendamentos")
    .update({ status: "cancelado" })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
