import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './firebaseConfig'; 
import { ref, onValue, push, update, remove } from 'firebase/database';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => {
      const tasksRef = ref(db, 'tasks');
      onValue(tasksRef, (snapshot) => {
        const fetchedTasks = [];
        snapshot.forEach((childSnapshot) => {
          fetchedTasks.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setTasks(fetchedTasks);
      });
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskTitle.trim()) {
      const newTask = { title: taskTitle, status: false };
      try {
        await push(ref(db, 'tasks'), newTask);
        setTaskTitle('');
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await update(taskRef, { status: !currentStatus });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await remove(taskRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.task}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskStatus}>{item.status ? 'Done' : 'Due'}</Text>
      <Switch
        value={item.status}
        onValueChange={() => toggleTaskStatus(item.id, item.status)}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={!taskTitle.trim()}
        color={!taskTitle.trim() ? 'gray' : 'blue'}
      />
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  taskList: {
    marginTop: 20,
    width: '100%',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
  },
  taskStatus: {
    fontSize: 18,
    color: 'gray',
  },
});
