import React from 'react'
import { Container, Heading, Text, VStack } from '@chakra-ui/react'

export default function About() {
    return (
        <VStack alignItems={'left'}  h={'90vh'} maxWidth={'100%'} px={10} py={10} spacing={5}>
            <Heading>About</Heading>
            <Text>This online tool was created to help in the arpeggio learning and practice process on the guitar. The idea is pretty simple: the tool will randomly play an arpeggio and it will display a diagram with its intervals and position on the fretboard. This way you can play random arpeggios on your guitar, helping you in the process of memorizing them.</Text>
            <Text>The arpeggios included in this tool can have its roots either in the 6th or the 5th string, and can start with the index, middle or pinky finger. You can also filter which chord types do you want to practice and which fingers and strings do you want the arpeggios to start in. You can even select individual chords, and they will appear randomly in the arpeggio player.</Text>
            <Text>This tool is mostly based on my personal practice routine, but I hope you can find it useful.</Text>
        </VStack>
    )
}
