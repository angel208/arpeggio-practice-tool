const Button = {
    // The styles all button have in common
    baseStyle: {
      fontWeight: 'normal',
      borderRadius: '6px', // <-- border radius is same for all variants and sizes
      padding: '8px 0',
      shadow: 'md',
      transition: 'box-shadow  0.2s'
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 4, // <-- px is short for paddingLeft and paddingRight
        py: 3, // <-- py is short for paddingTop and paddingBottom
      },
      md: {
        fontSize: 'md',
        px: 6, // <-- these values are tokens from the design system
        py: 4, // <-- these values are tokens from the design system
      },
    },
    // Two variants: outline and solid
    variants: {
      secondary: {
        border: '1px solid',
        borderColor: 'brand.100',
        color: 'brand.100',
        transition: 'background 0.3s',
        _hover : { bg: "brand.100", borderColor: 'none', color: 'white' }
      },
      primary: {
        bg: 'brand.100',
        color: 'white',
        border: 'none',
        _hover : { shadow: '0 4px 8px 0 rgba(0,0,0,0.3)' }
      },
    },
    // The default size and variant values
    defaultProps: {
      size: 'md',
      variant: 'primary',
    },
  }

  export default Button