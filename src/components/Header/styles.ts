import { makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    linkTag: {
        margin: theme.spacing(1),
        color: theme.palette.primary.main,
        textDecoration: 'none'
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    fileInputContainer: {
        position: 'relative'
    },
    fileInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer'
    }
}))

export default useStyles
