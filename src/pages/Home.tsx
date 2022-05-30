import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export interface INewTitle {
  taskId: number
  newTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    const sameTitle = tasks.find((item) => item.title === newTaskTitle)
    if (sameTitle) {
      return Alert.alert('Atenção', 'Esse título já existe')
    }
    setTasks((oldTasks) => [...oldTasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }))
    const foundItem = updatedTasks.find((item) => item.id === id)
    if (!foundItem) return

    foundItem.done = !foundItem.done
    setTasks(updatedTasks)
  }

  function handleEditTask({ taskId, newTitle }: INewTitle) {
    const updatedTasks = tasks.map((task) => ({ ...task }))
    const foundItem = updatedTasks.find((item) => item.id === taskId)
    if (!foundItem) return

    foundItem.title = newTitle

    setTasks(updatedTasks)

    function handleRemoveTask(id: number) {
      const taskCancel = tasks.filter((task) => task.id !== id)

      return Alert.alert(
        'Remover item',
        'Tem certeza que você deseja remover esse item?',
        [
          { style: 'cancel', text: 'não', onPress: () => {} },
          {
            text: 'sim',
            onPress: () => {
              setTasks(taskCancel)
            },
          },
        ]
      )
    }

    return (
      <>
        <View style={styles.container}>
          <Header tasksCounter={tasks.length} />

          <TodoInput addTask={handleAddTask} />

          <TasksList
            tasks={tasks}
            toggleTaskDone={handleToggleTaskDone}
            removeTask={handleRemoveTask}
            editTask={handleEditTask}
          />
        </View>
      </>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EBEBEB',
    },
  })
}
