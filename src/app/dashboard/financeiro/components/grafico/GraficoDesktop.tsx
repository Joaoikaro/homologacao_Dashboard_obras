'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { BarChart, ResponsiveContainer, Tooltip, YAxis, XAxis, Bar } from 'recharts';

import { Card, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import type { TooltipProps } from 'recharts';

import CustomTooltip from '@mui/material/Tooltip';

import { useFinanceiroGrafico } from '../../hooks/useFinanceiro';
import formatarMesAno from '@/utils/formatarMesAno';
import { formatDateOnly } from '@/utils/formatDateOnly';
import formatarDinheiroRealSemRS from '@/utils/formatarDinheiroRealSemRS';
import formatarNumeroCompacto from '@/utils/formatarNumeroCompacto';


type PeriodoOption = 'ULTIMOS_12_MESES' | 'PROXIMOS_6_MESES' | 'PROXIMOS_12_MESES' | 'ULTIMOS_6_ANOS';
type AgrupamentoOption = 'empresadoc' | 'razaosocialps' | 'descricaoformapagto' | 'empresar' | 'centrocusto' | 'moeda' | 'idplanocontas' | 'debito' | 'ano' | 'mes' | 'dia'

const getDateRange = (option: PeriodoOption) => {
  const hoje = new Date();

  hoje.setMonth(hoje.getMonth() - 1);

  const inicio = new Date(hoje);
  const fim = new Date(hoje);

  switch (option) {
    case 'ULTIMOS_12_MESES':
      inicio.setMonth(inicio.getMonth() - 11);
      break;

    case 'PROXIMOS_6_MESES':
      fim.setMonth(fim.getMonth() + 6);
      break;

    case 'PROXIMOS_12_MESES':
      fim.setMonth(fim.getMonth() + 12);
      break;
  }

  return {
    Data_Inicio: formatDateOnly(inicio),
    Data_Fim: formatDateOnly(fim)
  };
};


const periodos = [
  { value: 'ULTIMOS_12_MESES', label: 'Últimos 12 meses' },
  { value: 'PROXIMOS_6_MESES', label: 'Próximos 6 meses' },
  { value: 'PROXIMOS_12_MESES', label: 'Próximos 12 meses' },

  // { value: 'ULTIMOS_6_ANOS', label: 'Últimos 6 anos' },
]

const agrupamentos = [
  // { value: 'empresadoc', label: 'Empresa (Doc)' },
  // { value: 'razaosocialps', label: 'Razão Social' },
  // { value: 'descricaoformapagto', label: 'Forma de Pagamento' },
  // { value: 'empresar', label: 'Empresa' },
  // { value: 'centrocusto', label: 'Centro de Custo' },
  // { value: 'moeda', label: 'Moeda' },
  // { value: 'idplanocontas', label: 'Plano de Contas' },
  // { value: 'debito', label: 'Débito' },
  // { value: 'dia', label: 'Dia' },
  { value: 'ano', label: 'Ano' },
  { value: 'mes', label: 'Mês' },
]

const LinhaSaldo = ({ cor, label, valor, destaque }: { cor: string, label: string, valor: number, destaque?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 4 }}>
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div style={{ backgroundColor: cor, padding: '4px', borderRadius: '50%', marginRight: 4 }} />
      <Typography sx={{ fontSize: 13 }} >{label}</Typography>
    </div>
    <Typography style={{ color: cor, fontSize: 12, fontWeight: destaque ? 600 : 500 }}>
      {formatarDinheiroRealSemRS(valor)}
    </Typography>
  </div>
);


const GraficoDesktop = () => {
  const [periodo, setPeriodo] = useState<PeriodoOption>('ULTIMOS_12_MESES')
  const [agrupamento, setAgrupamento] = useState<AgrupamentoOption>('mes')

  const {
    data,
    isLoading,
    setFilters
  } = useFinanceiroGrafico()

  useEffect(() => {
    const { Data_Inicio, Data_Fim } = getDateRange(periodo)
    const Coluna_Agrupamento = agrupamento

    setFilters({
      Data_Inicio,
      Data_Fim,
      Coluna_Agrupamento,
    })

  }, [periodo, agrupamento])

  const CustomToolTip = (props: TooltipProps<any, any>) => {
    const { active, payload } = props as any;

    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    const corSaldo = (valor: number) =>
      valor < 0 ? 'var(--toastify-color-error)' : 'var(--toastify-color-info)';

    const Linha = ({
      cor,
      label,
      valor,
      destaque = false
    }: {
      cor: string;
      label: string;
      valor: number;
      destaque?: boolean;
    }) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginTop: 4,
        fontWeight: destaque ? 'bold' : 'normal',
        color: 'var(--mui-palette-text-primary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: cor,
            }}
          />
          <Typography variant="body2">{label}</Typography>
        </div>
        <Typography variant="body2" style={{ color: cor, fontWeight: destaque ? 'bold' : 'normal' }}>
          {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </div>
    );

    return (
      <Card
        style={{
          padding: 8,
          border: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          minWidth: 200,
        }}
      >
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          {formatarMesAno(item.agrupamento_Value)}
        </Typography>

        <Linha cor="var(--mui-palette-success-main)" label="Receber" valor={item.total_Credito} />
        <Linha cor="var(--mui-palette-error-main)" label="Pagar" valor={item.total_Debito} />
        <Linha cor={corSaldo(item.valor_Periodo)} label="Saldo Período" valor={item.valor_Periodo} />
        <Linha cor={corSaldo(item.valor_Inicial)} label="Saldo Inicial" valor={item.valor_Inicial} />
        <Divider style={{ margin: '8px 0' }}></Divider>
        <Linha
          cor={corSaldo(item.valor_Final)}
          label="Saldo Final"
          valor={item.valor_Final}
          destaque={true}
        />
      </Card>
    );
  };

  interface CustomXAxisTickProps {
    x?: number;
    y?: number;
    payload: { value: string };
    data: Array<{
      agrupamento_Value: string;
      total_Credito: number;
      total_Debito: number;
      valor_Periodo: number;
      valor_Inicial: number;
      valor_Final: number;
    }>;
  }

  const CustomXAxisTick = ({ x, y, payload, data }: CustomXAxisTickProps) => {
    const [expandido, setExpandido] = useState(false);
    const item = data.find((d) => d.agrupamento_Value === payload.value);

    if (!item) return null;

    const corSaldo = (valor: number) => valor < 0 ? 'var(--toastify-color-error)' : 'var(--toastify-color-info)';

    return (
      <foreignObject x={x! - 50} y={y!} width={110} height={400}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2">
            {agrupamento === 'ano' ? payload.value : formatarMesAno(payload.value)}
          </Typography>

          <div
            style={{
              fontFamily: 'Roboto, sans-serif',
              backgroundColor: 'var(--mui-palette-background-paper)',
              padding: '4px',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              color: 'var(--mui-palette-text-primary)',
              border: '1px solid var(--mui-palette-divider)',
              marginTop: 4,
              width: '100%'
            }}
          >
            {/* Receber */}
            <LinhaSaldo cor={'var(--mui-palette-success-main)'} label="Receber" valor={item.total_Credito} />

            {/* Pagar */}
            <LinhaSaldo cor={'var(--mui-palette-error-main)'} label="Pagar" valor={item.total_Debito} />

            {/* Botão toggle */}
            <CustomTooltip title={expandido ? 'Minimizar' : 'Expandir'} followCursor placement="top">
              <div
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: 10,
                  marginTop: 4
                }}
                role='button'
                tabIndex={0}
                onClick={() => setExpandido(!expandido)}
              >

                <Divider style={{ margin: '8px 0' }}>
                  <Typography variant="body2">{expandido ? '▲' : '▼'}</Typography>
                </Divider>
              </div>
            </CustomTooltip>

            {/* Só exibe esses se expandido */}
            {expandido && (
              <>
                {/* Periodo */}
                <LinhaSaldo cor={corSaldo(item.valor_Periodo)} label="Saldo Periodo" valor={item.valor_Periodo} />

                {/* Inicial */}
                <LinhaSaldo cor={corSaldo(item.valor_Inicial)} label="Saldo Inicial" valor={item.valor_Inicial} />
              </>
            )}

            {/* Saldo Final */}
            <LinhaSaldo destaque cor={corSaldo(item.valor_Final)} label="Saldo Final" valor={item.valor_Final} />
          </div>
        </div>
      </foreignObject>
    );
  };

  return (
    <Card style={{ border: '1px solid var(--mui-palette-divider)', padding: 16, }}>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-line-chart-line" style={{ fontSize: 22, color: 'var(--mui-palette-text-primary)' }} />
          <Typography variant="h4">Analise Financeira</Typography>
        </div>
        <Typography variant="body2">Graficos de analise financeira</Typography>
      </div>

      <Divider style={{ margin: '16px 0' }} />


      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <FormControl>
          <InputLabel>Agrupamento</InputLabel>
          <Select
            value={agrupamento}
            size='small'
            onChange={(e) => setAgrupamento(e.target.value as AgrupamentoOption)}
            label="Agrupamento"
            autoWidth
            style={{ marginBottom: 16, minWidth: 150 }}
          >
            {agrupamentos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Typography style={{ display: 'flex', alignItems: 'center', margin: '0 8px 0 0', color: 'var(--mui-palette-text-primary)' }}>
                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Período</InputLabel>
          <Select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value as PeriodoOption)}
            label="Período"
            size='small'
            autoWidth
          >
            {periodos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Typography style={{ display: 'flex', alignItems: 'center', margin: '0 8px 0 0', color: 'var(--mui-palette-text-primary)' }}>

                  {option.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>



      {isLoading ? (
        <ResponsiveContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          width="100%"
          height={600}
        >
          <CircularProgress size={80} />
        </ResponsiveContainer>
      ) : (
        data && data.length > 0 && (
          <div style={{ overflowX: 'auto', width: '100%', overflowY: 'hidden' }}>
            <div style={{ minWidth: `${data.length * 125}px` }}>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart
                  data={data || []}
                  margin={{ top: 20, right: 0, left: 0, bottom: 250 }}
                  height={500}
                  barCategoryGap={20}
                >
                  <XAxis
                    dataKey="agrupamento_Value"
                    tick={(props) => <CustomXAxisTick {...props} data={data} />}
                    tickFormatter={(value) => agrupamento === 'ano' ? value : formatarMesAno(value)}
                  />
                  <YAxis tickFormatter={formatarNumeroCompacto} tick={{ fontSize: 12 }} />
                  <Tooltip content={CustomToolTip} />
                  <Bar dataKey="total_Credito" radius={[8, 8, 0, 0]} fill="var(--mui-palette-success-main)" label="A receber" />
                  <Bar dataKey="total_Debito" radius={[8, 8, 0, 0]} fill="var(--mui-palette-error-main)" label="A pagar" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      )}
      {data && data.length === 0 && !isLoading && (
        <Typography>Nenhum dado encontrado para o período selecionado.</Typography>
      )}
    </Card>
  )
}

export default GraficoDesktop
