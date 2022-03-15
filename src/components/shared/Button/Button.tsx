


interface ButtonPropTypes {
    children: string,
    type?: 'button' | 'submit';
    version?: 'primary' | 'secondary';
    isDisabled?: boolean
}

function Button({ children, type='button', version = 'primary', isDisabled=false }: ButtonPropTypes) {
  return (
    <button type={type} className={`btn btn-${version}`} disabled={isDisabled}>
        {children}
    </button>
  )
}

export default Button