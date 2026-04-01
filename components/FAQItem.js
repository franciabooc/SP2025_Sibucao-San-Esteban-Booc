import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.questionText}>{question}</Text>
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#c00000"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f2f5',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    paddingBottom: 20,
  },
  answerText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});

export default FAQItem;

