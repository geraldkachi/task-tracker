import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Platform,
} from "react-native";
import { createTaskSchema } from "../utils/schemas";
import { z } from "zod";

interface AddTaskInputProps {
  onAdd: (title: string) => void;
}

export function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    setError(null);
    try {
      const { title } = createTaskSchema.parse({ title: value });
      onAdd(title);
      setValue("");
      Keyboard.dismiss();
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message ?? "Invalid input");
        inputRef.current?.shake?.();
      }
    }
  };

  const canSubmit = value.trim().length > 0;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, error ? styles.containerError : null]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={(t) => {
            setValue(t);
            if (error) setError(null);
          }}
          placeholder="Add a new task…"
          placeholderTextColor="#BDBDB5"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
          maxLength={200}
          accessibilityLabel="New task title"
          accessibilityHint="Type a task name and press Add or Return"
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.addBtn, canSubmit && styles.addBtnActive]}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Add task"
        >
          <Text style={[styles.addLabel, canSubmit && styles.addLabelActive]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2DC",
    backgroundColor: "#FAFAF7",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E2E2DC",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  containerError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 13 : 10,
    fontSize: 15,
    color: "#0F0F0F",
    fontWeight: "400",
  },
  addBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#E2E2DC",
  },
  addBtnActive: {
    backgroundColor: "#0F0F0F",
  },
  addLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },
  addLabelActive: {
    color: "#E8FF47",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
});
