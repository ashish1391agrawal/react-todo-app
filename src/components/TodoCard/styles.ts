import { makeStyles, Theme } from "@material-ui/core"
import { TodoCardStyleInterface } from "./types"

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    cardContainer: {
        margin: theme.spacing(1),
        cursor: 'move',
        maxWidth: 300,
        color: (properties: TodoCardStyleInterface) => properties.color,
        backgroundColor: (properties: TodoCardStyleInterface) => properties.backgroundColor,
        opacity: (properties: TodoCardStyleInterface) => properties.isDragStart ? 0 : 1
    },
    colorOption: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        cursor: 'pointer',
        color: (properties: TodoCardStyleInterface) => properties.color,
        backgroundColor: (properties: TodoCardStyleInterface) => properties.backgroundColor,
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
        borderRadius: '100%',
        cursor: 'pointer'
    },
    categoryList: {
        display: 'flex',
        marginLeft: '5px'
    },
    cardActionContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    todoDetailContainer: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '12px',
        color: (properties: TodoCardStyleInterface) => properties.color,
    },
    todoCardActionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    withoutMargin: {
        padding: "5px 16px"
    },
    headerAction: {
        marginTop: '0px',
        marginRight: '0px'
    },
    titleFont: {
        fontSize: '12px',
        fontWeight: 'bold'
    },
    otherFont: {
        fontSize: '12px'
    },
    iconFontSize: {
        fontSize: '16px',
        color: (properties: TodoCardStyleInterface) => properties.color,
    },
    selectControl: {
        lineHeight: 'normal',
        color: (properties: TodoCardStyleInterface) => properties.color,
    } 
}))

export default useStyles
