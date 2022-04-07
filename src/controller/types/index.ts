/**
 * Basic JSON response for controllers
 */

export type BasicResponse = {
    message: string
}

/**
 * Basic JSON goodbye response for controllers
 */

export type GoodbyeResponse={
    message: string,
    date: string
}


/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
    error: string,
    message: string

}