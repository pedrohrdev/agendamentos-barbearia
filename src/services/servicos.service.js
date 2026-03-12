import { supabase } from "../database/index.js";

export async function criarServicosService(dados) {
  const { data, error } = await supabase
    .from("servicos")
    .insert([dados])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function listarServicosService() {
  const { data, error } = await supabase.from("servicos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function listarServicosPorIdService(id) {
  const { data, error } = await supabase
    .from("servicos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function atualizarServicoService(id, dados) {
  const { data, error } = await supabase
    .from("servicos")
    .update(dados)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletarServicoService(id) {
  const { data, error } = await supabase
    .from("servicos")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
