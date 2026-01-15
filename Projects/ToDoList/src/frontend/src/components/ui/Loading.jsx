import React from 'react'
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
 const Loading = () => {
  return (
    <>
    <Button disabled size="sm">
        <Spinner />
        Loading...
    </Button>
    </>
  )
}

export default Loading