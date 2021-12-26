import React from 'react'
import { Tooltip, Box } from '@chakra-ui/react'
import { CgInfo } from 'react-icons/cg';

function FilterTooltip({ text='placeholder', size='sm'}) {
    return (
        <Tooltip label={text} placement={'auto'} size={size} py={2}>
            <Box display={'inline-block'} color={'gray.500'} mx={3} cursor={'pointer'} ><CgInfo size={16}/></Box>
        </Tooltip>
    )
}

export default FilterTooltip
