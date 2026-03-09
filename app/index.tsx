import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "../store/taskStore";
import { TaskItem } from "../components/TaskItem";
import { FilterBar } from "../components/FilterBar";
import { AddTaskInput } from "../components/AddTaskInput";
import { EmptyState } from "../components/EmptyState";

export default function HomeScreen() {
  const {
    hydrated,
    hydrate,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    filteredTasks,
    counts,
  } = useTaskStore();

  // Load persisted tasks on mount
  useEffect(() => {
    hydrate();
  }, []);

  const tasks = filteredTasks();
  const taskCounts = counts();
  const completedCount = taskCounts.completed;
  const totalCount = taskCounts.all;

  if (!hydrated) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color="#0F0F0F" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAF7" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Task Tracker</Text>
          <Text style={styles.subtitle}>
            {totalCount === 0
              ? "No tasks"
              : `${completedCount} of ${totalCount} complete`}
          </Text>
        </View>

        {/* Progress bar */}
        {totalCount > 0 && (
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round((completedCount / totalCount) * 100)}%` },
              ]}
            />
          </View>
        )}
      </View>

      {/* ── Add Task ── */}
      <AddTaskInput onAdd={addTask} />

      {/* ── Filter Bar ── */}
      <FilterBar active={filter} counts={taskCounts} onChange={setFilter} />

      {/* ── Task List ── */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
        ListEmptyComponent={<EmptyState filter={filter} />}
        contentContainerStyle={tasks.length === 0 ? styles.emptyContent : undefined}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        // Performance optimisations
        removeClippedSubviews={Platform.OS !== "web"}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAF7",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FAFAF7",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2DC",
    gap: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F0F0F",
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E2E2DC",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#A8E6B0",
    borderRadius: 2,
    minWidth: 4,
  },
  emptyContent: {
    flex: 1,
  },
});
