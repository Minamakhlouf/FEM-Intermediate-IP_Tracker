function ErrorResponse(props) {
    if (props.type === "user information") {
        return (
            <p className="error__output-field">Error!</p>
        )
    }
}

export default ErrorResponse;