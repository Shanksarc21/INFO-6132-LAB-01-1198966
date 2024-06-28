import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskStatus = (index) => {
    const newTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, status: !task.status } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const renderTask = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskStatus}>{item.status ? 'Done/true' : 'Due/false'}</Text>
      <Switch
        value={item.status}
        onValueChange={() => toggleTaskStatus(index)}
      />
      <TouchableOpacity onPress={() => deleteTask(index)}>
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
        keyExtractor={(item, index) => index.toString()}
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
