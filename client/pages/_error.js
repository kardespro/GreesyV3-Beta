import Nav from '../components/Navbar'
function Error({ statusCode }) {
  return (
    <>
    <Nav />
    <br />
    <p className="text-red-500 text-center">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
      <br />
      <br/>
      <center>
      <a href="/" className="text-center rounded-lg w-full transition py-5 mt-3 px-4 bg-blue-400 text-white">Home </a>
      </center>

      <br />
      <br />
       <center>
      <a href="/api/reportError?error= {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}" className="text-center rounded-lg w-full transition py-5 mt-3 px-4 bg-blue-400 text-white">Report Error </a>
      </center>

      </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
