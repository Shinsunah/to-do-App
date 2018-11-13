import React, {
    Component
} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
    }
    from "react-native";
import { TextInput } from "react-native-gesture-handler";
import PropTypes from "prop-types"


    const {
        width,
        height
    } = Dimensions.get("window");

export default class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text
        };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        id:PropTypes.string.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        uncompleteToDo: PropTypes.func.isRequired,
        completeToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired
    }

    render() {
        const { isEditing, toDoValue }  = this.state;
        const { text , id, deleteToDo, isCompleted }  = this.props;
        return ( 
            <View style={styles.container}>

                    {/* 1 */}
                    <View style={styles.column}>
                        <TouchableOpacity onPress={this._toggleComplete}>
                            <View
                                style = {[
                                    styles.circle,
                                    isCompleted ? styles.completedCircle : styles.uncompletedCircle
                                ]}
                                />
                        </TouchableOpacity>
                        {isEditing ? (
                                    <TextInput 
                                        style={[
                                            styles.text,  
                                            styles.input, 
                                            isCompleted ? styles.completedText : styles.uncompletedText
                                        ]} 
                                        value={toDoValue} 
                                        multiline={true}
                                        onChangeText={this._controlInput}
                                        returnKeyType={"done"}
                                        onBlur={this._finishEditing}
                                        />
                                ) : (                        
                                    <Text 
                                        style = {[
                                            styles.text,
                                            isCompleted ? styles.completedText : styles.uncompletedText
                                    ]}> 
                                    {text}
                                    </Text> )}
                    </View>
                    {/* 2 */}
                        {isEditing ? (
                            <View style={styles.actions}>
                                <TouchableOpacity onPressOut={this._finishEditing}>
                                    <View style={styles.actionContainer}>
                                        <Text style={styles.actionText}>✔</Text>
                                        {/* <Image source={require('./assets/images/pencil.png')} />  */}
                                    </View>
                                </TouchableOpacity>
                            
                            </View>
                        ):(
                            <View style={styles.actions}>
                                <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✎</Text>
                                </View>
                                </TouchableOpacity>   
                                <TouchableOpacity onPressOut={event=> deleteToDo(id) }>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>▤</Text>
                                </View>
                                </TouchableOpacity>                        
                            </View>
                        )}
            </View>
      
        );

    }
    _toggleComplete = (event) => {
        const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
        console.log(this.props);
        if (isCompleted) {
            uncompleteToDo(id);
        } else {
            completeToDo(id);
        }
    };
    _startEditing = (event)=>{
        this.setState({
            isEditing:true,
        });
    };
    _finishEditing = (event)=>{
        const{ toDoValue } = this.state;
        const{ id, updateToDo } = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing:false
        });
    };
    _controlInput = text =>{
        console.log('here!!!!',text);
        this.setState({ toDoValue:text });
    }
}
const styles = StyleSheet.create({
    container: {
        width: width-50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 20,
        borderColor: "red",
        borderWidth: 3
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#f23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353535"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input:{
        marginVertical:20,
        width: width / 2
    },
    actionText:{
        fontSize:20
    }

});