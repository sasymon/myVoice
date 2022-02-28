import React, { useState, useEffect } from 'react'
import { Image, Center } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

export default function BackButton () {
  const imageSrc = '/images/backButton.png'
  const [path, setPath] = useState(useLocation().pathname)

  useEffect(() => {
    if (path.charAt(path.length - 1) === '/') {
      setPath(path.substring(0, path.length - 2))
    }
  }, [])

  return (
    <Link to={`${path}/..`}>
      <Center
        width={{ base: '110px', md: '130px' }}
        height="full"
        padding='2'>
        <Image
          src={imageSrc}
          alt={'backButton'}
          maxHeight="full"
          borderRadius='20px'/>
      </Center>
    </Link>
  )
}