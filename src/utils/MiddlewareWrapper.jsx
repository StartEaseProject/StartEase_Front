const MiddlewareWrapper = ({ children, middlewares, empty }) => {
  const init = () => <>{children}</>
  const WrappedLayout = middlewares.reduceRight(
    (AccumulatedLayout, Middleware) => {
      return () => (
        <Middleware empty={empty}>
          <AccumulatedLayout />
        </Middleware>
      )
    },
    init
  )

  return <WrappedLayout />
}

export default MiddlewareWrapper
