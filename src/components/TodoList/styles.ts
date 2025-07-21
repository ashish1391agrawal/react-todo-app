import { makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    todoListContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: (properties: { color: string }) => properties.color,
        backgroundColor: (properties: { color: string }) => properties.color,
        boxShadow: (properties: { color: string }) => `0px 0px 4px 0px ${properties.color}`,
        borderRadius: 4,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        minWidth: '300px',
        minHeight: '79vh',
        maxHeight: '80vh',
        overflowY: 'auto'
    },
    todoTitle: {
        textTransform: 'capitalize',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
    addMoreIcon: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.primary.main,
        alignItems: 'center',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.default,
        padding: '0px 10px',
        borderRadius: 4
    },
    colorOption: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        cursor: 'pointer',
        backgroundColor: (properties: { color: string }) => properties.color,
        border: '1px solid',
        position: 'relative',
        borderRadius: '100%'
    },
    colorInput: {
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
        position: 'absolute',
        opacity: 0,
        borderRadius: '100%'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.background.default,
            outline: '1px solid slategrey',
            borderRadius: 50
        }
    },
    cardActionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    colorContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    overrideOutlineInput: {
        padding: theme.spacing(1)
    },
    overrideOutlineRoot: {
        marginBottom: theme.spacing(1)
    }
}))

export default useStyles
