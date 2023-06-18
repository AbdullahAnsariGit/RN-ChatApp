import RNBounceable from '@freakycoder/react-native-bounceable';
import { todoDelete } from '@services/redux/actions/deleteTodo';
import { addTodo } from '@services/redux/actions/todo';
import { updateTodo } from '@services/redux/actions/updateTodo';
import { icons } from 'assets/imgs';
import { themes } from 'assets/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, TextInput } from 'react-native-paper';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';



export default function BooksListApp() {

    const dispatch = useDispatch()
    const [task, setTask] = useState<string>(''); // Initialize task as an empty string
    const [id, setId] = useState<string>(''); // Initialize task as an empty string
    console.log("🚀 ~ file: Todo.tsx:28 ~ BooksListApp ~ id:", id)

    console.log("🚀 ~ file: Todo.tsx:27 ~ BooksListApp ~ task:", task)
    const data = useSelector((state) => {
        const allTodosList = state?.todos
        const updateTodo = state?.newTodo
        console.log("🚀 ~ file: Todo.tsx:31 ~ data ~ updateTodo:", updateTodo)
        return {
            allTodosList,
            newListt:updateTodo[0]
        }
    })
    console.log("🚀 ~ file: Todo.tsx:25 ~ data ~ data:", data)

    const handleAddTodo = (tasks: any) => {
        if (tasks.trim()) {
            dispatch(addTodo(tasks))
            setTask('')
        }

    };

    const handleUpdateNew = (task:any, id:number) => {
console.log('val', task, id)
dispatch(updateTodo(task,id))
setTask('')

    }

    const handleDelete = (index: number) => {
        dispatch(todoDelete(index))
    }


    const handleUpdate = (item:any) => {
        console.log("🚀 ~ file: Todo.tsx:67 ~ handleUpdate ~ item:", item)
        // dispatch(updateTodo(index))
    setTask(item?.task)
    setId(item?.id)
        // setTask(data?.newListt?.task)
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
            <Button mode="contained" onPress={() => handleUpdateNew(task, id)} style={styles.addButton}>
                Update
            </Button>
            <FlatList
                data={data?.allTodosList}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, borderWidth: 0.5, borderColor: '#000000' }}>
                        <Text numberOfLines={1} style={styles.list}>{item.task}</Text>
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <RNBounceable style={styles.send} onPress={() => handleDelete(index)}>
                                <FastImage source={icons?.Delete} style={styles.sndicon} />
                            </RNBounceable>
                            <RNBounceable style={styles.send} onPress={() => handleUpdate(item)}>
                                <FastImage source={icons?.Upload} style={styles.sndicon} />
                            </RNBounceable>
                        </View>
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
        width:'70%',
        textAlign:'left'
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
