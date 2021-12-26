const Heading = {
    baseStyle: {
      fontWeight: 'normal',
      fontSize: '20',
      color:"gray.600"
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: 'xl',
        fontWeight: 'light',
        py: 3, // <-- py is short for paddingTop and paddingBottom
      },
      md: {
        fontSize: '2xl',
        fontWeight: 'light',
        py: 5, // <-- these values are tokens from the design system
      },
      lg: {
        fontSize: '2xl',
        py: 3, // <-- py is short for paddingTop and paddingBottom
      },
      xl: {
        fontSize: '3xl',
        py: 4, // <-- these values are tokens from the design system
      },
      
    },
    defaultProps: {
      size: 'xl',
    },
  }

  export default Heading