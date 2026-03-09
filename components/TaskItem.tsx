import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const date = new Date(task.createdAt);
  const timeLabel = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateLabel = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.row}>
      {/* Checkbox */}
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={[styles.checkbox, task.completed && styles.checkboxDone]}
        activeOpacity={0.7}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
      >
        {task.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      {/* Content */}
      <Pressable style={styles.content} onPress={() => onToggle(task.id)}>
        <Text
          style={[styles.title, task.completed && styles.titleDone]}
          numberOfLines={3}
        >
          {task.title}
        </Text>
        <Text style={styles.meta}>
          {dateLabel} · {timeLabel}
        </Text>
      </Pressable>

      {/* Delete */}
      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteBtn}
        activeOpacity={0.6}
        accessibilityLabel={`Delete task: ${task.title}`}
        accessibilityRole="button"
      >
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2DC",
    backgroundColor: "#FAFAF7",
    gap: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#0F0F0F",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: "#A8E6B0",
    borderColor: "#A8E6B0",
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F0F0F",
    lineHeight: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0F0F0F",
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  meta: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0EFE9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: 20,
    color: "#6B6B6B",
    lineHeight: 24,
    fontWeight: "300",
  },
});
