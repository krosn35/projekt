import { FlatList, StyleSheet, Text, View } from 'react-native';
import { akce } from '../../constants/_data'; // Načteme naše data (ty 2 tečky znamenají "o složku výš")

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.nadpis}>Vodácký kalendář 2026</Text>
      
      {/* FlatList je komponenta pro dlouhé seznamy */}
      <FlatList
        data={akce} // Naše data
        keyExtractor={(item) => item.id.toString()} // Unikátní klíč pro každou položku
        renderItem={({ item }) => (
          // Takhle bude vypadat jedna položka v seznamu:
          <View style={styles.polozka}>
            <Text style={styles.nazev}>{item.nazev}</Text>
            <Text style={styles.datum}>{item.datum} • {item.reka}</Text>
            <Text>{item.popis}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Styly (jako CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50, // Aby to nebylo pod horní lištou mobilu
  },
  nadpis: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  polozka: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  nazev: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datum: {
    color: '#666',
    marginBottom: 5,
  },
});