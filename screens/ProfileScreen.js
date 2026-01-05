import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';

import ProfileListItem from '../components/ProfileListItem';
import ContactCard from '../components/ContactCard';
import FAQItem from '../components/FAQItem';
import profileIcon from '../assets/profile-icon.png';
import goUncLogo from '../assets/logo2.jpg';

// --- Mock Data ---
const emergencyContacts = [
    { id: '1', icon: 'shield', title: 'Police', number: '(054) 811-71-61' },
    { id: '2', icon: 'zap', title: 'Ambulance', number: '(054) 811-71-62' },
    { id: '3', icon: 'home', title: 'University Clinic', number: '(054) 871-28-25 loc 141' },
    { id: '4', icon: 'alert-triangle', title: 'Fire Department', number: '(054) 811-71-71' },
];
const faqData = [
  { question: 'How do I find a specific building or room?', answer: 'Navigate to the "List" tab...' },
  { question: 'How does the routing feature work?', answer: 'On the "Explore" screen, tap the route icon...' },
  { question: 'What are "Saved Locations"?', answer: 'When viewing a specific room... you can tap the bookmark icon to save it.' },
];
const feedbackCategories = ['Map Error', 'Bug Report', 'Suggestion', 'Other'];

export default function ProfileScreen({ onBackPress }) {
    const [currentView, setCurrentView] = useState('main');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [eventsEnabled, setEventsEnabled] = useState(true);
    const [maintenanceEnabled, setMaintenanceEnabled] = useState(true);
    const [reportsEnabled, setReportsEnabled] = useState(true);
    const [activeFeedbackCategory, setActiveFeedbackCategory] = useState('Map Error');
    const [feedbackEmail, setFeedbackEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const MainProfileView = () => (
        <>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <Image source={profileIcon} style={styles.avatar} />
                    <Text style={styles.name}>Juan Dela Cruz</Text>
                    <Text style={styles.email}>juan.delacruz@unc.edu.ph</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SETTINGS</Text>
                    <View style={styles.sectionContent}>
                        <ProfileListItem icon="bell" text="Manage Notifications" onPress={() => setCurrentView('manageNotifications')} />
                        <View style={styles.divider} />
                        <ProfileListItem icon="moon" text="Appearance" type="toggle" value={isDarkMode} onValueChange={setIsDarkMode} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>CAMPUS RESOURCES</Text>
                    <View style={styles.sectionContent}>
                        <ProfileListItem icon="phone" text="Emergency Contacts" onPress={() => setCurrentView('emergencyContacts')} />
                    </View>
                </View>
                 <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ABOUT</Text>
                    <View style={styles.sectionContent}>
                        <ProfileListItem icon="help-circle" text="Help & Support" onPress={() => setCurrentView('helpAndSupport')} />
                        <View style={styles.divider} />
                        <ProfileListItem icon="send" text="Send Feedback" onPress={() => setCurrentView('sendFeedback')} />
                        <View style={styles.divider} />
                        <ProfileListItem icon="info" text="About Go-UNC" onPress={() => setCurrentView('aboutGoUNC')} />
                    </View>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?')}><Text style={styles.logoutButtonText}>Log Out</Text></TouchableOpacity>
            </ScrollView>
        </>
    );

    const ManageNotificationsView = () => (
        <>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Notifications</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView>
                 <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ANNOUNCEMENTS FROM ADMIN</Text>
                    <Text style={styles.sectionDescription}>Receive updates about university events, maintenance schedules, and other important campus news.</Text>
                    <View style={styles.sectionContent}>
                        <ProfileListItem icon="calendar" text="University Events" type="toggle" value={eventsEnabled} onValueChange={setEventsEnabled} />
                        <View style={styles.divider} />
                        <ProfileListItem icon="tool" text="Maintenance Alerts" type="toggle" value={maintenanceEnabled} onValueChange={setMaintenanceEnabled} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SUBMITTED REPORTS</Text>
                     <Text style={styles.sectionDescription}>Get notified when the status of a map error or feedback you've submitted has been updated.</Text>
                    <View style={styles.sectionContent}>
                        <ProfileListItem icon="check-circle" text="Report Status Updates" type="toggle" value={reportsEnabled} onValueChange={setReportsEnabled} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
    
    const EmergencyContactsView = () => (
        <>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Emergency Contacts</Text>
                <View style={{ width: 24 }} />
            </View>
            <View style={styles.noteContainer}><Text style={styles.noteText}>Note: The following contact information is intended for use within the campus premises.</Text></View>
            <ScrollView style={styles.contactList}>
                {emergencyContacts.map(contact => (<ContactCard key={contact.id} icon={contact.icon} title={contact.title} number={contact.number} />))}
            </ScrollView>
        </>
    );

    const HelpAndSupportView = () => (
        <>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView style={styles.contactList}>
                <Text style={styles.faqHeader}>Frequently Asked Questions</Text>
                {faqData.map((item, index) => (<FAQItem key={index} question={item.question} answer={item.answer} />))}
            </ScrollView>
        </>
    );

    const SendFeedbackView = () => {
        const handleSubmit = () => {
            if (!feedbackMessage) {
                Alert.alert('Empty Message', 'Please enter your feedback before submitting.');
                return;
            }
            console.log({ category: activeFeedbackCategory, email: feedbackEmail, message: feedbackMessage });
            Alert.alert('Feedback Sent', 'Thank you for your input! We have received your feedback.');
            setCurrentView('main');
        };

        return (
            <>
                <View style={styles.customHeader}>
                    <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                    <Text style={styles.headerTitle}>Send Feedback</Text>
                    <View style={{ width: 24 }} />
                </View>
                <ScrollView style={styles.feedbackContainer}>
                    <Text style={styles.feedbackLabel}>Select a Category:</Text>
                    <View style={styles.feedbackCategoryContainer}>
                        {feedbackCategories.map(category => (
                            <TouchableOpacity key={category} style={[styles.feedbackCategoryButton, activeFeedbackCategory === category && styles.activeFeedbackCategoryButton]} onPress={() => setActiveFeedbackCategory(category)}>
                                <Text style={[styles.feedbackCategoryText, activeFeedbackCategory === category && styles.activeFeedbackCategoryText]}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.feedbackLabel}>Your Email (Optional):</Text>
                    <TextInput style={styles.feedbackInput} placeholder="juan.cruz@unc.edu.ph" keyboardType="email-address" autoCapitalize="none" value={feedbackEmail} onChangeText={setFeedbackEmail} />
                    <Text style={styles.feedbackLabel}>Please describe your feedback:</Text>
                    <TextInput style={[styles.feedbackInput, styles.feedbackTextArea]} placeholder="Tell us what's on your mind..." multiline numberOfLines={6} value={feedbackMessage} onChangeText={setFeedbackMessage} />
                    <View style={styles.feedbackActions}>
                        <TouchableOpacity style={[styles.feedbackButton, styles.cancelButton]} onPress={() => setCurrentView('main')}><Text style={[styles.feedbackButtonText, styles.cancelButtonText]}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.feedbackButton, styles.submitButton]} onPress={handleSubmit}><Text style={[styles.feedbackButtonText, styles.submitButtonText]}>Submit</Text></TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        );
    };

    const AboutGoUNCView = () => (
        <>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}><Icon name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                <Text style={styles.headerTitle}>About Go-UNC</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.aboutContainer}>
                <Image source={goUncLogo} style={styles.aboutLogo} />
                <Text style={styles.aboutText}>Go-UNC is your official guide to navigating the University of Nueva Caceres campus. Our goal is to provide students, faculty, and visitors with an easy-to-use tool for discovering locations, finding routes, and staying updated with campus announcements.</Text>
                <View style={styles.aboutSection}><Text style={styles.aboutSectionTitle}>Version</Text><Text style={styles.aboutInfoText}>1.0.0 (Build 20250929)</Text></View>
                <View style={styles.aboutSection}><Text style={styles.aboutSectionTitle}>Developed By</Text><Text style={styles.aboutText}>This application was developed with dedication by the student development team from the College of Computer Studies.</Text><Text style={styles.developerName}>Nichole Raizza Sibucao - Lead Developer & UI/UX Designer</Text><Text style={styles.developerName}>Annemhony San Esteban</Text><Text style={styles.developerName}>Francia Booc</Text></View>
                <View style={styles.aboutSection}><Text style={styles.aboutSectionTitle}>Acknowledgements</Text><Text style={styles.aboutText}>We would like to extend our sincere gratitude to the following for their invaluable support and for providing the data that made this app possible:</Text><Text style={styles.acknowledgementItem}>The Grounds and Building Management Office</Text><Text style={styles.acknowledgementItem}>The College of Computer Studies Faculty</Text></View>
                <View style={styles.sectionContent}><ProfileListItem icon="lock" text="Privacy Policy" onPress={() => Alert.alert('Navigate', 'Go to Privacy Policy')} /><View style={styles.divider} /><ProfileListItem icon="file-text" text="Terms of Service" onPress={() => Alert.alert('Navigate', 'Go to Terms of Service')} /></View>
                <Text style={styles.copyrightText}>© 2025 University of Nueva Caceres. All Rights Reserved.</Text>
            </ScrollView>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            {currentView === 'main' ? <MainProfileView /> :
             currentView === 'manageNotifications' ? <ManageNotificationsView /> :
             currentView === 'emergencyContacts' ? <EmergencyContactsView /> :
             currentView === 'helpAndSupport' ? <HelpAndSupportView /> :
             currentView === 'sendFeedback' ? <SendFeedbackView /> :
             currentView === 'aboutGoUNC' ? <AboutGoUNCView /> :
             null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    customHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', },
    backButton: { padding: 5, },
    headerTitle: { fontSize: 20, fontWeight: 'bold', },
    profileHeader: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff', },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, },
    name: { fontSize: 22, fontWeight: 'bold', },
    email: { fontSize: 15, color: '#666', },
    section: { marginHorizontal: 15, marginTop: 20, },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 10, marginLeft: 10, },
    sectionDescription: { fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10, lineHeight: 20, },
    sectionContent: { backgroundColor: '#fff', borderRadius: 15, },
    divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 50, },
    logoutButton: { backgroundColor: '#c00000', borderRadius: 15, paddingVertical: 15, margin: 15, marginTop: 30, alignItems: 'center', },
    logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', },
    contactList: { padding: 15, },
    noteContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginHorizontal: 15, marginTop: 20, borderWidth: 1, borderColor: '#e0e0e0', },
    noteText: { color: '#666', textAlign: 'center', lineHeight: 20, fontStyle: 'italic', },
    faqHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333', },
    feedbackContainer: { padding: 15, },
    feedbackLabel: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10, },
    feedbackCategoryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, },
    feedbackCategoryButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#e0e0e0', marginRight: 10, marginBottom: 10, },
    activeFeedbackCategoryButton: { backgroundColor: '#c00000', },
    feedbackCategoryText: { color: '#000', fontWeight: '600', },
    activeFeedbackCategoryText: { color: '#fff', },
    feedbackInput: { backgroundColor: '#fff', borderRadius: 10, padding: 15, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 20, },
    feedbackTextArea: { height: 150, textAlignVertical: 'top', },
    feedbackActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, },
    feedbackButton: { borderRadius: 15, paddingVertical: 12, paddingHorizontal: 25, marginLeft: 10, },
    cancelButton: { backgroundColor: '#e0e0e0', },
    submitButton: { backgroundColor: '#c00000', },
    feedbackButtonText: { fontSize: 16, fontWeight: 'bold', },
    cancelButtonText: { color: '#333', },
    submitButtonText: { color: '#fff', },
    aboutContainer: { padding: 20, alignItems: 'center', },
    aboutLogo: { width: 120, height: 120, marginBottom: 20, },
    aboutText: { fontSize: 15, textAlign: 'center', lineHeight: 22, color: '#333', marginBottom: 20, },
    aboutSection: { width: '100%', marginBottom: 20, },
    aboutSectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', paddingBottom: 5, },
    aboutInfoText: { fontSize: 15, color: '#333', },
    developerName: { fontSize: 15, color: '#333', marginTop: 5, },
    acknowledgementItem: { fontSize: 15, color: '#333', marginTop: 5, },
    copyrightText: { fontSize: 12, color: '#888', marginTop: 30, textAlign: 'center', },
});

