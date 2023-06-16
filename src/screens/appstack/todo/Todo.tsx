import RNBounceable from '@freakycoder/react-native-bounceable';
import { todoDelete } from '@services/redux/actions/deleteTodo';
import { addTodo } from '@services/redux/actions/todo';
import { icons } from 'assets/imgs';
import { themes } from 'assets/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, TextInput } from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';

// interface Todo {
//     id: string;
//     task: string;
// }
// interface NewTodo {
//     id: string;
//     task: string;
// }

export default function BooksListApp() {

    const dispatch = useDispatch()
    const [task, setTask] = useState<string>(''); // Initialize task as an empty string
    // const [todos, setTodos] = useState<Todo[]>([]); // Initialize todos as an empty array
    const data = useSelector((state) => {
        const allTodosList = state?.todos
        return allTodosList
    })
    console.log("🚀 ~ file: Todo.tsx:25 ~ data ~ data:", data)

    const handleAddTodo = (tasks: any) => {
        // static way
        if (task.trim()) {
            // const newTodo: NewTodo = {
            //     id: Math.random().toString().substring(3, 4),
            //     task: task.trim(),
            // };
            // setTodos(prevTodos => [...prevTodos, newTodo])
            dispatch(addTodo(tasks))
            setTask('')
        }

    };

    const handleDelete = (index:number) => {
    dispatch(todoDelete(index))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>React Native ToDo App with Redux Persist</Text>
            <Text style={styles.title}>Add ToDo Here</Text>
            <TextInput
                style={styles.input}
                // mode="outlined"
                label="Task"
                value={task}
                onChangeText={task => setTask(task)}
            />
            <Button mode="contained" onPress={() => handleAddTodo(task)} style={styles.addButton}>
                Add
            </Button>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15, paddingVertical:10, borderWidth:0.5, borderColor:'#000000'}}>
                        <Text style={styles.list}>{item.task}</Text>
                        <RNBounceable style={styles.send} onPress={()=> handleDelete(index) }>
                            <FastImage source={icons?.Delete} style={styles.sndicon} />
                        </RNBounceable>
                    </View>;
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        margin: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        // height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    addButton: {
        margin: 12,
    },
    send: {
        backgroundColor: themes?.colors?.lightBlue,
        padding: 8,
        borderRadius: 5,
        elevation: 2,
    },
    sndicon: {
        height: responsiveWidth(5),
        width: responsiveWidth(5),
    },  
});
