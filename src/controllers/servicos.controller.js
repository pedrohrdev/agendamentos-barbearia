import {
  criarServicosService,
  listarServicosService,
  listarServicosPorIdService,
} from "../services/servicos.service.js";

export async function criarServico(req, res) {
  try {
    const { nome, preco, duracao_minutos } = req.body;

    if (!nome || !preco || !duracao_minutos) {
      return res.status(400).json({
        error: "Dados obrigatorios faltando",
      });
    }

    const novoServico = await criarServicosService({
      nome,
      preco,
      duracao_minutos,
    });

    return res.status(201).json(novoServico);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message || "Erro interno",
    });
  }
}

export async function listarServico(req, res) {
  try {
    const servicos = await listarServicosService();
    return res.status(200).json(servicos);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}

export async function listarServicoPorId(req, res) {
  try {
    const { id } = req.params;

    const servico = await listarServicosPorIdService(id);

    if (!servico) {
      return res.status(404).json({
        message: "Servico nao encontrado",
      });
    }

    return res.status(200).json(servico);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}

export async function atualizarServico(req, res) {
  const { id } = req.params;
  const { nome, preco, duracao_minutos } = req.body;

  try {
    const servicoAtualizado = await atualizarServicoService(id, {
      nome,
      preco,
      duracao_minutos,
    });

    if (!servicoAtualizado) {
      return res.status(404).json({
        message: "Servico nao encontrado",
      });
    }

    return res.status(200).json(servicoAtualizado);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}

export async function deletarServico(req, res) {
  const { id } = req.params;

  try {
    const servicoDeletado = await deletarServicoService(id);

    if (!servicoDeletado) {
      return res.status(404).json({
        message: "Servico nao encontrado",
      });
    }

    return res.status(200).json({
      message: "Servico deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor",
    });
  }
}
