import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%'
    },
    todoAppContainer: {
        backgroundImage: (properties: { bacgroundImage: string }) => `url(${properties.bacgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}))

export default useStyles
