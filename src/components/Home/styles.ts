import { makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(1),
        overflow: 'auto'
    },
    dialogContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dialogRoot: {
        padding: `4px ${theme.spacing(1)}px`
    }
}))

export default useStyles
