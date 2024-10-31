// CourseItem.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CourseItemProps {
  course: {
    id: string;
    name: string;
    dayOfWeek: string;
    duration: string;
    price: number;
    time: string;
    capacity: number;
    courseType: string;
    description: string;
  };
  onPress: () => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <View style={styles.containerName}>
          <Text style={styles.name}> {course.name}</Text>
        </View>
        <View style={styles.containerContent}>
          <Text>Type of course:{course.courseType}</Text>
          <Text>Day of Week: {course.dayOfWeek}</Text>
          <Text>Start at: {course.time}</Text>
          <Text>Time: {course.duration} minutes</Text>
          <Text>Price per class : {course.price}$</Text>
          <Text>Capacity: {course.capacity}</Text>
          <Text>Description: {course.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffff',
    elevation: 3,
    padding: 10,
  },
  containerName: {

  },
  containerContent: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 6,
    fontWeight: "bold",
  },
});

export default CourseItem;
