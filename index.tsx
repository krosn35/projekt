import { akce } from '@/constants/_data';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const KATEGORIE = ['ČPV', 'Turistické', 'Závody']; 

export default function HomeScreen() {
  const [vybranaAkce, setVybranaAkce] = useState<any>(null);
  const [aktivniFiltry, setAktivniFiltry] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFiltr = (kategorie: string) => {
    if (aktivniFiltry.includes(kategorie)) {
      setAktivniFiltry(aktivniFiltry.filter(k => k !== kategorie));
    } else {
      setAktivniFiltry([...aktivniFiltry, kategorie]);
    }
  };

  const filtrovaneAkce = akce.filter(polozka => {
    if (aktivniFiltry.length === 0) return true;
    return aktivniFiltry.includes(polozka.typ);
  });

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.filtrBtn} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="filter" size={24} color="white" />
        <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>Filtr</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtr akcí</Text>
            
            <View style={{width: '100%', marginBottom: 20}}>
                {KATEGORIE.map(kat => (
                    <TouchableOpacity 
                        key={kat} 
                        style={styles.checkboxRow}
                        onPress={() => toggleFiltr(kat)}
                    >
                        <Text style={{fontSize: 18}}>{kat}</Text>
                        <View style={[
                            styles.checkbox, 
                            aktivniFiltry.includes(kat) && styles.checkboxActive
                        ]}>
                            {aktivniFiltry.includes(kat) && <Ionicons name="checkmark" size={16} color="white" />}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
                style={styles.zavritBtn} 
                onPress={() => setModalVisible(false)}
            >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Hotovo ({filtrovaneAkce.length})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.8175,
          longitude: 15.4730,
          latitudeDelta: 4.0,
          longitudeDelta: 4.0,
        }}
        onPress={() => setVybranaAkce(null)}
      >
        {filtrovaneAkce.map((polozka) => (
          <Marker
            key={polozka.id}
            coordinate={polozka.souradnice}
            onPress={(e) => {
                e.stopPropagation(); 
                setVybranaAkce(polozka);
            }}
          />
        ))}
      </MapView>

      {vybranaAkce && (
        <View style={styles.karta}>
          <Text style={styles.nazev}>{vybranaAkce.nazev}</Text>
          <View style={{flexDirection: 'row', gap: 10, marginBottom: 5}}>
              <Text style={styles.tag}>{vybranaAkce.typ}</Text>
          </View>
          <Text style={styles.info}>📅 {vybranaAkce.datum}</Text>
          <Text style={styles.info}>🌊 {vybranaAkce.reka}</Text>
          <Text style={styles.popis}>Obtížnost: {vybranaAkce.easy}</Text>
          
          <TouchableOpacity onPress={() => setVybranaAkce(null)} style={styles.tlacitko}>
             <Text style={{color: 'white', fontWeight: 'bold'}}>Zavřít</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  filtrBtn: {
      position: 'absolute', top: 50, right: 20,
      backgroundColor: '#007AFF', padding: 10, borderRadius: 25,
      zIndex: 10, flexDirection: 'row', alignItems: 'center', elevation: 5,
  },
  modalOverlay: {
      flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
      width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20,
      alignItems: 'center', elevation: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  checkboxRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', width: '100%',
  },
  checkbox: {
      width: 24, height: 24, borderWidth: 2, borderColor: '#007AFF', borderRadius: 4,
      justifyContent: 'center', alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#007AFF' },
  zavritBtn: {
      marginTop: 20, backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20,
  },
  karta: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: 'white', padding: 20, borderRadius: 15, elevation: 5,
  },
  nazev: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  tag: {
      backgroundColor: '#eee', paddingHorizontal: 8, paddingVertical: 2,
      borderRadius: 4, fontSize: 12, color: '#555',
  },
  info: { fontSize: 16, color: '#333', marginBottom: 2 },
  popis: { marginTop: 10,color: '#666' },
  tlacitko: {
      marginTop: 15, backgroundColor: '#007AFF', padding: 10, borderRadius: 8, alignItems: 'center',
  }
});