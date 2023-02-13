/* eslint-disable no-undef */
import { useEffect, useRef } from 'react'
import { useScript } from '../hooks/use-script'
export const useSweetAlert2 = () => {
  const status = useScript(
    'https://unpkg.com/sweetalert2@11.7.1/dist/sweetalert2.all.min.js'
  )
  const ToastFire = useRef(null)
  useEffect(() => {
    if (status === 'ready') {
      if (typeof Swal !== 'undefined') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        ToastFire.current = (args) => Toast.fire(args)
      }
    }
  }, [status, ToastFire])
  return [status, ToastFire]
}
