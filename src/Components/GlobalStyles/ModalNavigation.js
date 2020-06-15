import React, {useState} from 'react';
import {Modal, View, Text} from 'react-native';
import MaterialIcons from '@expo/vector-icons';

const [modalOpen, setModalOpen] = useState(false);


<View>
<Modal visible={modalOpen} animationType='slide'>
    <View>
        <Text></Text>
        <MaterialIcons 
            name='close'
            size={24}
            onPress={() => setModalOpen(false)}
        />
        <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonContainer} 
                    onPress={() => {
                        this.props.navigation.navigate('Home', {displayName: this.state.displayName});
                    }}>
                    <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
    </View>
</Modal>

<MaterialIcons 
    name='add'
    size={24}
    onPress={() => setModalOpen(true)}
/>
</View>


