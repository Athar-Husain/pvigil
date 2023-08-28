import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DrawerContent = () => {
    const navigation = useNavigation();

  // Function to handle navigation to different screens
//   const handleNavigation = (screen) => {
    // Implement your navigation logic here
    // For example, you can use a navigation library like react-navigation to navigate to the desired screen
    //   navigation.navigate(screen);
//   };

  return (
    <View>
      {/* Your custom drawer content */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <Text>About</Text>
      </TouchableOpacity>
      {/* Add more items as needed */}
    </View>
  );
};

export default DrawerContent;
