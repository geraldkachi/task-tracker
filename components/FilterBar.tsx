import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FilterType } from "../types";

interface FilterBarProps {
  active: FilterType;
  counts: { all: number; active: number; completed: number };
  onChange: (f: FilterType) => void;
}

const TABS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const count = counts[tab.key];
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive && styles.tabActive]}
            activeOpacity={0.7}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            <View style={[styles.badge, isActive && styles.badgeActive]}>
              <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                {count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2DC",
    backgroundColor: "#FAFAF7",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#E2E2DC",
    gap: 6,
  },
  tabActive: {
    backgroundColor: "#0F0F0F",
    borderColor: "#0F0F0F",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B6B6B",
    letterSpacing: 0.2,
  },
  labelActive: {
    color: "#E8FF47",
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E2E2DC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeActive: {
    backgroundColor: "#E8FF47",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6B6B6B",
    letterSpacing: 0.2,
  },
  badgeTextActive: {
    color: "#0F0F0F",
  },
});
