const BackupInstaladoWrapper = (props: { children: React.ReactNode; instalado: number }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.instalado === 1 ? '#1c83d4' : '#e57c00',
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

export default BackupInstaladoWrapper
