'use client'

/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { BarChart, ResponsiveContainer, Tooltip, YAxis, XAxis, Bar } from 'recharts';

import { Card, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';

import type { TooltipProps } from 'recharts';

import { useFinanceiroGrafico } from '../../hooks/useFinanceiro';
import formatarMesAno from '@/utils/formatarMesAno';
import { formatDateOnly } from '@/utils/formatDateOnly';

import formatarNumeroCompacto from '@/utils/formatarNumeroCompacto';

import abreviarMesSigla from '@/utils/abreviarMesSigla';


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
]

const agrupamentos = [
  { value: 'ano', label: 'Ano' },
  { value: 'mes', label: 'Mês' },
]

const GraficoMobile = () => {
  const [periodo, setPeriodo] = useState<PeriodoOption>('ULTIMOS_12_MESES')
  const [agrupamento, setAgrupamento] = useState<AgrupamentoOption>('mes')

  // const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  // const isMobile = screenWidth <= 600

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

  const CustomFilters = () => {

    const isMobile = useMediaQuery('(max-width:450px)')

    return (
      <>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 0 : 16, marginBottom: 16, justifyContent: 'space-between' }}>
          <FormControl fullWidth >
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

          <FormControl fullWidth>
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
      </>
    )
  }

  const CustomToolTip = (props: TooltipProps<any, any>) => {
    const { active } = props;
    const payload = (props as any).payload;

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
    const item = data.find((d) => d.agrupamento_Value === payload.value)

    if (!item) return null

    const separarMesAno = (value: string) => {
      const partes = value.split('-')


      return {
        mes: partes[0],
        ano: partes[1],
      }
    }

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
    const isMobile = screenWidth <= 600

    const { mes, ano } = separarMesAno(payload.value)

    return (
      <foreignObject x={x! - 15} y={y!} width={30} height={100}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" fontSize={isMobile ? 9 : 11}>
            {agrupamento === 'ano' ? payload.value : abreviarMesSigla(mes)}
          </Typography>
          <div style={{ width: '100%', height: '0.5px', backgroundColor: 'var(--mui-palette-text-primary)' }} />
          <Typography variant="body2" fontSize={isMobile ? 9 : 11}>
            {isMobile ? ano.slice(2) : abreviarMesSigla(ano)} {/* ex: '25' ou '2025' */}
          </Typography>
        </div>
      </foreignObject>
    )
  }

  return (
    <Card style={{ border: '1px solid var(--mui-palette-divider)', padding: 16, }}>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-line-chart-line" style={{ fontSize: 22, color: 'var(--mui-palette-text-primary)' }} />
          <Typography variant="h5">Analise Financeira</Typography>
        </div>
        <Typography variant="body2">Analise em grafico</Typography>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      {/* <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 16, justifyContent: 'space-between' }}>
        <FormControl fullWidth >
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

        <FormControl fullWidth>
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
      </div> */}

      <CustomFilters />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data || []}
              margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
              height={500}
              barGap={2}
              barCategoryGap={4}
            >
              <XAxis
                dataKey="agrupamento_Value"
                tick={(props) => <CustomXAxisTick {...props} data={data} />}
                tickFormatter={(value) => agrupamento === 'ano' ? value : formatarMesAno(value)}
                interval={0}
                minTickGap={-9999}
              />
              <YAxis tickFormatter={formatarNumeroCompacto} tick={{ fontSize: 12 }} />
              <Tooltip content={CustomToolTip} />
              <Bar dataKey="total_Credito" radius={[8, 8, 0, 0]} fill="var(--mui-palette-success-main)" label="A receber" />
              <Bar dataKey="total_Debito" radius={[8, 8, 0, 0]} fill="var(--mui-palette-error-main)" label="A pagar" />
            </BarChart>
          </ResponsiveContainer>
        )
      )}
      {data && data.length === 0 && !isLoading && (
        <Typography>Nenhum dado encontrado para o período selecionado.</Typography>
      )}
    </Card>
  )
}

export default GraficoMobile
