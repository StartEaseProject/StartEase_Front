import { useNavigate } from "react-router-dom"

const useRedirect = (path="") => {
    const delay = 2000 // 2 seconds
    const navigate = useNavigate()
      return () => {
        setTimeout(() => {
          navigate(path)
        }, delay)
      }
}


export default useRedirect