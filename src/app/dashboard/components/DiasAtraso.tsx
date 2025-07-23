interface DiasAtrasoProps {
  diasAtraso: number
}

export const DiasAtraso = ({ diasAtraso }: DiasAtrasoProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: diasAtraso === 0 ? '#4caf50' : diasAtraso === 1 ? '#e57c00' : '#f14343',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '14px',
      }}
    >
      <p>{diasAtraso <= 0 ? 'Em dia' : `${diasAtraso} dias`}</p>
    </div>
  )
}
