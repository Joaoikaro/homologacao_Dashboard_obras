const TableStatusWrapper = (props: { children: React.ReactNode; status: string | number }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.status === 'Ativo' ? '#4caf50' : '#f14343',
        width: '100%',
        height: '100%',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '14px'
      }}
    >
      {props.children}
    </div>
  )
}

export default TableStatusWrapper
