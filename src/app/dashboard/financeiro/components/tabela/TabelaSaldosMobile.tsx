'use client'

import { useEffect, useState } from 'react'

import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from '@mui/material'

import type { FinanceiroSaldoContaResponse } from '@/types/financeiroSaldoConta'
import formatarData from '@/utils/formatarData'
import formatarDinheiroReal from '@/utils/formatarDinheiroReal'
import { useFinanceiroSaldoConta } from '@/hooks/useFinanceiroSaldoConta'
import capitalizeText from '../../../../../../../../utils/captitalizeText';


const TabelaSaldosMobile = () => {
  const { saldoConta } = useFinanceiroSaldoConta()
  const [valorTotal, setValorTotal] = useState(0)

  useEffect(() => {
    if (saldoConta) {
      const total = saldoConta.reduce((acc, item) => acc + item.vlSaldo, 0)

      setValorTotal(total)
    }
  }, [saldoConta])

  if (!saldoConta) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Card
      style={{
        padding: 0,
        maxHeight: 500,
        overflow: 'hidden',
        border: '1px solid var(--mui-palette-divider)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="ri-bank-line" style={{ fontSize: 22, color: 'var(--mui-palette-text-primary)' }} />
            <Typography variant="h5">Detalhes das contas</Typography>
          </div>
          <Typography color={valorTotal > 0 ? 'success.main' : 'error.main'} variant="body1" fontWeight={600}>
            {formatarDinheiroReal(valorTotal)}
          </Typography>
        </div>
      </div>

      <Divider />

      <div style={{ overflowY: 'auto', padding: 0 }}>
        {saldoConta.map((row: FinanceiroSaldoContaResponse, index: number) => (
          <CardContent
            key={index}
            style={{
              padding: 0,
              marginBottom: 0,
              border: '1px solid var(--mui-palette-divider)',
              borderRadius: 0,
            }}
          >
            <CardContent style={{ padding: 12 }}>
              <div style={{display: 'flex', flexDirection: 'row', gap: 4}}>
              <Typography variant="caption" color="text.secondary">
                {row.nBancoFormatado || '---'}
              </Typography>
              -
              <Typography variant="subtitle2"  fontWeight={600}>
                {capitalizeText(row.nomeConta) || 'Indisponível'}
              </Typography>
              </div>

              <Typography
                variant="h6"
                color={
                  row.vlSaldo < 0
                    ? 'error.main'
                    : row.vlSaldo === 0
                      ? 'text.secondary'
                      : 'success.main'
                }
                fontWeight={700}
              >
                {formatarDinheiroReal(row.vlSaldo)}
              </Typography>

              <div style={{display: 'flex'}}>
              <Typography variant="caption" color="text.secondary">
                {row.dataUltConciliacao ? formatarData(row.dataUltConciliacao) : 'Sem conciliação'}
              </Typography>
              </div>
            </CardContent>
          </CardContent>
        ))}
      </div>
    </Card>

  )
}

export default TabelaSaldosMobile
