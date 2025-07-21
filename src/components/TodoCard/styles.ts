import { makeStyles, Theme } from "@material-ui/core"
import { TodoCardStyleInterface } from "./types"

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    cardContainer: {
        margin: theme.spacing(1),
        cursor: 'move',
        maxWidth: 300,
        backgroundColor: (properties: TodoCardStyleInterface) => properties.color,
        opacity: (properties: TodoCardStyleInterface) => properties.isDragStart ? 0 : 1
    },
    colorOption: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        cursor: 'pointer',
        backgroundColor: (properties: TodoCardStyleInterface) => properties.color,
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
    cardActionContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    todoDetailContainer: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    todoCardActionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    } 
}))

export default useStyles
