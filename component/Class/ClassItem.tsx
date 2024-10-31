// ClassItem.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Class {
  id: string;
  teacher: string;
  className: string;
  classDate: string;
  description: string;
}

interface ClassItemProps {
  classItem: Class;
  onPress: (classItem: Class) => void;
}

export default function ClassItem({ classItem, onPress }: ClassItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(classItem)}
    >
      <Text style={styles.nameClass}>Tên lớp: {classItem.className}</Text>
      <Text style={styles.teacher}>Giáo viên: {classItem.teacher}</Text>
      <Text style={styles.time}>Thời gian: {classItem.classDate}</Text>
      <Text style={styles.fee}>Mô tả: {classItem.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#e0f7fa",
    borderRadius: 8,
    elevation: 2,
  },
  nameClass: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  teacher: {},
  time: {
    fontSize: 14,
    color: "#666",
  },
  fee: {
    fontSize: 14,
    color: "#00796b",
  },
});
