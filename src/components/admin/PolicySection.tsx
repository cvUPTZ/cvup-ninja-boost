import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PolicySection = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-cvup-purple mb-4">
        CVUP : Une Plateforme Algérienne Innovante pour l'Épanouissement Professionnel
      </h2>
      
      <div className="text-right mb-6">
        <p className="text-2xl font-bold text-cvup-peach">معا سي في أب باينة تلقى خدمة</p>
        <p className="text-sm text-gray-600 italic">(M3a CV UP Bayna Tel9a Khedma)</p>
      </div>

      <p className="text-gray-700 mb-8">
        CVUP est bien plus qu'une simple plateforme de création de CV. C'est un écosystème complet conçu pour outiller les jeunes professionnels algériens, en leur offrant les outils, les connaissances et le réseau nécessaires pour atteindre leurs objectifs de carrière. Notre stratégie repose sur la qualité, la personnalisation et des résultats concrets.
      </p>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="vision" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-semibold text-cvup-purple">
            Vision Centrale de CVUP
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Le CV comme fondation</h4>
              <p>Nous considérons le CV comme la base de toute recherche d'emploi réussie. C'est pourquoi nous avons développé deux modèles exclusifs, conçus pour le marché algérien et optimisés pour passer les systèmes de suivi des candidatures (ATS).</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">La préparation comme clé</h4>
              <p>Nous sommes convaincus que la réussite passe par une préparation minutieuse. C'est pour cela que nous proposons des simulations d'entretien réalistes et des outils pour vous donner confiance.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Le développement des compétences comme moteur</h4>
              <p>La recherche d'emploi est une occasion de se perfectionner. Nos formations sont conçues pour vous permettre d'acquérir les compétences les plus demandées sur le marché du travail.</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">La communauté comme force</h4>
              <p>Nous encourageons les partenariats avec les clubs étudiants pour construire une communauté d'entraide et de succès.</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-semibold text-cvup-purple">
            Notre Modèle de Tarification
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <Card className="border-l-4 border-l-cvup-peach">
              <CardHeader>
                <CardTitle className="text-lg">CV_UP Découverte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mb-2">Prix: 0 DA</p>
                <p className="italic mb-4">Pour Qui: Ce niveau est idéal pour débuter et découvrir la plateforme.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Une révision automatisée de CV par mois (basique)</li>
                  <li>Une checklist LinkedIn basique</li>
                  <li>Accès limité aux ressources</li>
                  <li>Pas d'accès à nos modèles de CV</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cvup-peach">
              <CardHeader>
                <CardTitle className="text-lg">CV_UP Club+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mb-2">Prix: 0 DA</p>
                <p className="italic mb-4">Pour Qui: Idéal pour les membres de clubs partenaires.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accès à nos modèles de CV exclusifs</li>
                  <li>Deux révisions automatisées par mois</li>
                  <li>Guide complet d'Optimisation LinkedIn</li>
                  <li>Accès à 3 modules de formations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cvup-peach">
              <CardHeader>
                <CardTitle className="text-lg">CV_UP Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bold mb-2">Prix: 0 DA</p>
                <p className="italic mb-4">Pour Qui: Idéal pour un accompagnement complet.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accès complet aux modèles de CV</li>
                  <li>Revues de CV illimitées</li>
                  <li>Optimisation LinkedIn Pro</li>
                  <li>Accès à tous les modules</li>
                </ul>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="formations" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-semibold text-cvup-purple">
            Nos Formations et Projets
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Modules de Formation en Auto-Apprentissage</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cours pratiques sur la rédaction de CV</li>
                <li>Préparation aux entretiens</li>
                <li>Création de contenu LinkedIn</li>
                <li>Accès flexible selon vos besoins</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Programme "Skill_It_Up"</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accompagnement complet dans le développement de compétences</li>
                <li>Ateliers pratiques et projets personnels</li>
                <li>Encadrement par des experts</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Modèles "CV CAN"</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modèles adaptés au marché canadien</li>
                <li>Guides et conseils spécialisés</li>
                <li>Support pour la transition internationale</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="strengths" className="border-b border-gray-200">
          <AccordionTrigger className="text-xl font-semibold text-cvup-purple">
            Nos Points Forts
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-4">
            <ol className="list-decimal pl-6 space-y-3">
              <li><span className="font-semibold">Des Modèles de CV Uniques:</span> Conçus spécifiquement pour le marché algérien</li>
              <li><span className="font-semibold">Une Plateforme Complète:</span> De la création de CV à l'obtention du poste</li>
              <li><span className="font-semibold">Axé sur les Résultats:</span> Focus sur l'efficacité et le succès des utilisateurs</li>
              <li><span className="font-semibold">Une Communauté Solide:</span> Réseau de partenaires et clubs étudiants</li>
              <li><span className="font-semibold">Adaptabilité:</span> Options flexibles selon vos besoins</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-center text-cvup-purple font-semibold mt-8 italic">
        CVUP - Votre partenaire pour une carrière réussie
      </p>
    </div>
  );
};