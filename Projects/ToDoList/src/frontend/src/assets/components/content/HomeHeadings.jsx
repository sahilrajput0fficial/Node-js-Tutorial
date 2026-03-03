import React from 'react'
import { TypographyH3, TypographyHeading } from '@/components/ui/typography'
const HomeHeadings = ({H1,H2}) => {
  return (
    <>
    <TypographyHeading>
        {H1}
    </TypographyHeading>
    <TypographyH3 className="relative font-bold text-boat-red after:block after:absolute after:h-0.5 after:w-8 after:bg-boat-red after:bottom-0 after:left-0">
        {H2}
    </TypographyH3>
    </>
  )
}

export default HomeHeadings
