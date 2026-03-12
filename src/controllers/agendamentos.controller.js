import {
  criarAgendamentoService,
  listarAgendamentosUsuarioService,
  cancelarAgendamentoService,
} from "../services/agendamentos.service.js";

export async function criarAgendamento(req, res) {
  try {
    const cliente_id = req.user.id;
    const { barbeiro_id, servico_id, data_inicio } = req.body;

    if (!barbeiro_id || !servico_id || !data_inicio) {
      return res.status(400).json({
        error: "Dados obrigatórios faltando",
      });
    }

    const agendamento = await criarAgendamentoService({
      cliente_id,
      barbeiro_id,
      servico_id,
      data_inicio,
    });

    return res.status(201).json(agendamento);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message || "Erro interno",
    });
  }
}

export async function listarMeusAgendamentos(req, res) {
  try {
    const cliente_id = req.user.id;

    const agendamentos = await listarAgendamentosUsuarioService(cliente_id);

    return res.status(200).json(agendamentos);
  } catch (err) {
    return res.status(500).json({
      error: "Erro interno",
    });
  }
}

export async function cancelarAgendamento(req, res) {
  try {
    const { id } = req.params;

    const resultado = await cancelarAgendamentoService(id);

    return res.status(200).json(resultado);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message,
    });
  }
}
