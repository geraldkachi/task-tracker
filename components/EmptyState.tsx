import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FilterType } from "../types";

interface EmptyStateProps {
  filter: FilterType;
}

const CONTENT: Record<FilterType, { icon: string; heading: string; sub: string }> = {
  all: {
    icon: "📋",
    heading: "No tasks yet",
    sub: "Add your first task above to get started.",
  },
  active: {
    icon: "✅",
    heading: "Nothing pending",
    sub: "All tasks are done — great work!",
  },
  completed: {
    icon: "🎯",
    heading: "Nothing completed yet",
    sub: "Mark a task as done and it'll show up here.",
  },
};

export function EmptyState({ filter }: EmptyStateProps) {
  const { icon, heading, sub } = CONTENT[filter];

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F0F0F",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
});
