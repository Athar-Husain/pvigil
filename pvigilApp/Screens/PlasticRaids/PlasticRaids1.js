import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllRaids } from "../../redux/features/officials/RaidsSlice";

const PlasticRaids = () => {
  const dispatch = useDispatch();
  const { allRaids } = useSelector((state) => state.raid);
  const [raids, setRaids] = useState(allRaids || []); // Initialize with empty array

  const [refreshing, setRefreshing] = useState(false);
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    dispatch(getAllRaids());
  }, [dispatch]);

  const fetchRaidsData = () => {
    // Replace this with the actual API call to fetch raids data
    // For now, using the data from Redux state
    // setRaids(allRaids);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchRaidsData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRaidsData();
  };

  const handleRaidPress = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        {allRaids.map((raid) => (
          <Animated.View
            key={raid._id} // Using a unique key
            style={[styles.raidBox, { transform: [{ scale: animatedValue }] }]}
          >
            <TouchableOpacity onPress={handleRaidPress}>
              <Text style={styles.raidName}>{raid.description}</Text>
              <Text style={styles.raidLocation}>
                {raid.location.coords.join(", ")}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 16,
  },
  raidBox: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 8,
    backgroundColor: "#f0f0f0",
  },
  raidName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  raidLocation: {
    fontSize: 14,
    color: "#777",
  },
});

export default PlasticRaids;
