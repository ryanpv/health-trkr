import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useState } from "react";
import  { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import auth from '@react-native-firebase/auth';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { register, watch, setValue, control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("data: ", data);
    const createUser = await auth().createUserWithEmailAndPassword(data.email, data.password);
    console.log("createUser: ", createUser);
  }

  const password = watch("password")

  return (
    <SafeAreaView className="bg-gray-300 h-full">
        <View>
          <Text>
            Welcome Aboard
          </Text>
          <Text>
            Create an account now
          </Text>
        </View>

      <View>
        <View className="gap-y-5">
          <View>
            <Controller
              control={control}
              name="name"
              rules={{ required: true}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={ "gray" }
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.name ? "Name is required." : ""}
            </Text>            
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              rules={{ required: true}}
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.email ? "Email is required." : ""}
            </Text> 
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              rules={{ 
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Password must contain at least one uppercase letter and one number",
                },
              }}
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  secureTextEntry={true}
                  textContentType="oneTimeCode"
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.password ? `${ errors.password.message }` : ""}
            </Text> 
          </View>

          <View>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{ 
                required: true,
                validate: (value) => value === password || "Passwords do not match."
              }}
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  secureTextEntry={true}
                  textContentType="oneTimeCode"
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.confirmPassword ? `${ errors.confirmPassword.message }` : ""}
            </Text> 
          </View>
        </View>

        <Text className="mx-10 mt-5">By continuing you accept our Privacy Policy and Terms of Use</Text>

        <TouchableOpacity className="bg-blue-500 p-4 m-10 rounded" onPress={handleSubmit(onSubmit)}>
          <Text className="text-white text-center text-lg">Register</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 35,
    padding: 10,
    height: 55,
    fontSize: 18
  }
});



export default Signup;