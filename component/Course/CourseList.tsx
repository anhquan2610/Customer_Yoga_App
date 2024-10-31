// CourseList.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { firestore } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../type/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import SearchBar from "../Search/Search"; 

interface Course {
  id: string;
  name: string;
  dayOfWeek: string;
  duration: string;
  price: number;
  time: string; 
  courseType: string;
  capacity: number;
  description: string;
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const timeOfDayOptions = [
  { label: "All time", value: "1" },
  { label: "Sáng", value: "morning" },
  { label: "Chiều", value: "afternoon" },
  { label: "Tối", value: "evening" },
];

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(""); 
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>(""); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList: Course[] = [];
        const querySnapshot = await getDocs(collection(firestore, "courses"));

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          courseList.push({
            id: doc.id,
            name: data.name,
            dayOfWeek: data.dayOfWeek,
            duration: data.duration,
            price: data.price,
            time: data.time,
            capacity: data.capacity,
            courseType: data.courseType,
            description: data.description,
          });
        });

        setCourses(courseList);
        setFilteredCourses(courseList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu: ", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCoursePress = (courseId: string) => {
    navigation.navigate("ClassList", { courseId });
  };

  const filterCourses = () => {
    let filtered = courses;

    // Lọc theo ngày
    if (selectedDay && selectedDay !== "Tất cả các ngày") {
      filtered = filtered.filter((course) => course.dayOfWeek === selectedDay);
    }

    // Lọc theo thời gian trong ngày
    if (selectedTimeOfDay) {
      filtered = filtered.filter((course) => {
        const [hour] = course.time.split(":").map(Number);
        if (selectedTimeOfDay === "1") return hour >= 0 && hour < 24;
        if (selectedTimeOfDay === "morning") return hour >= 5 && hour < 12;
        if (selectedTimeOfDay === "afternoon") return hour >= 12 && hour < 17;
        if (selectedTimeOfDay === "evening") return hour >= 17 && hour < 22;
        return true;
      });
    }

    // Lọc theo tên khóa học
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    filterCourses();
  }, [selectedDay, selectedTimeOfDay, searchTerm]); 

  return (
    <View style={styles.container}>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <View>
        <Text style={styles.setFilter}>Set Filter</Text>
      </View>

      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(value) => setSelectedDay(value)}
          style={styles.picker}
        >
          <Picker.Item label="All Day" value="Tất cả các ngày" />
          {daysOfWeek.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedTimeOfDay}
          onValueChange={(value) => {
            setSelectedTimeOfDay(value);
          }}
          style={styles.picker}
        >
          {timeOfDayOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseItem
            course={item}
            onPress={() => handleCoursePress(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  setFilter: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    display: "flex",
  },
  picker: {
    height: 50,
    width: "48%",
  },
});
