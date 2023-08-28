import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

export default function SignInWithOTP() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    const navigation = useNavigation();

    const handleSignInWithOTP = () => {
        // Perform sign in with OTP logic here
    };

    return (
        <View style={styles.container}>
            <Text>OTP</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={text => setOTP(text)}
            />
            <Button title="Sign In with OTP" onPress={handleSignInWithOTP} />

            <Text style={styles.infoText}>
                An OTP will be sent to your registered email address.
            </Text>
            <TouchableOpacity>
                <Text style={styles.linkText}>Resend OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    infoText: {
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});
