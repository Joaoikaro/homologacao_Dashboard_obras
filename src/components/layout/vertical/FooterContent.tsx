'use client'

const FooterContent = () => {
  return (
    <div
      style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
    >
      <p>
        <span>{`© Gerente Max All Rights Reserved ${new Date().getFullYear()} `}</span>
      </p>
     
    </div>
  )
}

export default FooterContent
